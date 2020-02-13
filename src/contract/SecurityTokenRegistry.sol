pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

library SafeMath {
    /**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}

library Util {
    /**
    * @notice Changes a string to upper case
    * @param _base String to change
    */
    function upper(string memory _base) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        for (uint256 i = 0; i < _baseBytes.length; i++) {
            bytes1 b1 = _baseBytes[i];
            if (b1 >= 0x61 && b1 <= 0x7A) {
                b1 = bytes1(uint8(b1) - 32);
            }
            _baseBytes[i] = b1;
        }
        return string(_baseBytes);
    }

    /**
     * @notice Changes the string into bytes32
     * @param _source String that need to convert into bytes32
     */
    /// Notice - Maximum Length for _source will be 32 chars otherwise returned bytes32 value will have lossy value.
    function stringToBytes32(string memory _source)
        internal
        pure
        returns (bytes32)
    {
        return bytesToBytes32(bytes(_source), 0);
    }

    /**
     * @notice Changes bytes into bytes32
     * @param _b Bytes that need to convert into bytes32
     * @param _offset Offset from which to begin conversion
     */
    /// Notice - Maximum length for _source will be 32 chars otherwise returned bytes32 value will have lossy value.
    function bytesToBytes32(bytes memory _b, uint256 _offset)
        internal
        pure
        returns (bytes32)
    {
        bytes32 result;

        for (uint256 i = 0; i < _b.length; i++) {
            result |= bytes32(_b[_offset + i] & 0xFF) >> (i * 8);
        }
        return result;
    }

    /**
     * @notice Changes the bytes32 into string
     * @param _source that need to convert into string
     */
    function bytes32ToString(bytes32 _source)
        internal
        pure
        returns (string memory)
    {
        bytes memory bytesString = new bytes(32);
        uint256 charCount = 0;
        uint256 j = 0;
        for (j = 0; j < 32; j++) {
            bytes1 char = bytes1(bytes32(uint256(_source) * 2**(8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    /**
     * @notice Gets function signature from _data
     * @param _data Passed data
     */
    function getSig(bytes memory _data) internal pure returns (bytes4 sig) {
        uint256 len = _data.length < 4 ? _data.length : 4;
        for (uint256 i = 0; i < len; i++) {
            sig |= bytes4(_data[i] & 0xFF) >> (i * 8);
        }
        return sig;
    }
}

contract Ownable {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @return the address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    /**
     * @return true if `msg.sender` is the owner of the contract.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     * @notice Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract Pausable is Ownable {
    event Pause();
    event Unpause();

    bool public paused = false;

    /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /**
   * @dev Modifier to make a function callable only when the contract is paused.
   */
    modifier whenPaused() {
        require(paused);
        _;
    }

    /**
   * @dev called by the owner to pause, triggers stopped state
   */
    function pause() public onlyOwner whenNotPaused {
        paused = true;
        emit Pause();
    }

    /**
   * @dev called by the owner to unpause, returns to normal state
   */
    function unpause() public onlyOwner whenPaused {
        paused = false;
        emit Unpause();
    }
}

interface ISTFactory {
    function STRegistery() external returns (address);

    function deployToken(
        string calldata _name,
        string calldata _symbol,
        uint8 _decimals,
        string calldata _tokenDetails,
        address _issuer
    ) external returns (address tokenAddress);

    function changeSTRegistery(address newSTRegistery) external;
}

contract SecurityTokenRegistry is Pausable {
    using SafeMath for uint256;

    uint256 public expiryLimit = 15 * 24 * 3600; //15 days
    address public STFactory;
    address public polyToken;
    uint256 public stLaunchFee;
    uint256 public tickerRegFee;
    uint256 public latestProtocolVersion;
    address public polymathRegistry;

    address[] public activeUsers;
    mapping(address => bool) public seenUsers;

    mapping(address => bytes32[]) public userToTokenSymbol;
    mapping(string => SymbolDetails) public registeredTokenSymbols;
    mapping(string => uint256) public tokenSymbolIndex;
    mapping(string => address) public tokenSymbolToSecurityTokenAddress;
    mapping(address => SecurityTokenData) securityTokens;
    mapping(string => SecurityTokenData) public tokenSymbolToSecurityTokenData;
    // mapping(bytes32 => address) protocolVersionST;
    // mapping(uint256 => ProtocolVersion) versionData;

    // struct ProtocolVersion {
    //     uint8 major;
    //     uint8 minor;
    //     uint8 patch;
    // }

    struct SymbolDetails {
        string symbol;
        address owner;
        uint256 registrationDate;
        uint256 expiryDate;
        bool isReserved;
        bool isDeployed;
    }

    struct SecurityTokenData {
        address contractAddress;
        string symbol;
        string name;
        string tokenDetails;
        uint256 deployedAt;
        bool isMinted;
    }

    struct SymbolDetailsAndSTData {
        SymbolDetails symbolDetails;
        SecurityTokenData securityTokenData;
    }

    event RegisterTokenSymbol(
        address indexed _owner,
        string _symbol,
        uint256 indexed _registrationDate,
        uint256 _expiryDate
        // bool _fromAdmin,
        // uint256 _registrationFeePoly,
        // uint256 _registrationFeeUsd
    );

    event NewSecurityToken(
        string _symbol,
        string _name,
        address indexed _securityTokenAddress,
        address indexed _owner,
        uint256 _addedAt
    );

    function getAllUserTokenSymbols(address _owner)
        public
        view
        returns (bytes32[] memory)
    {
        return userToTokenSymbol[_owner];
    }

    function getAllOwnerSymbolsDetailsAndSTData(address _owner)
        public
        view
        returns (SymbolDetailsAndSTData[] memory)
    {
        bytes32[] memory symbols = getAllUserTokenSymbols(_owner);

        SymbolDetailsAndSTData[] memory _symbolDetailsAndSTData = new SymbolDetailsAndSTData[](
            symbols.length
        );

        for (uint256 index = 0; index < symbols.length; index++) {
            string memory tokenSymbol = Util.bytes32ToString(symbols[index]);
            _symbolDetailsAndSTData[index] = getSymbolDetailsAndSTData(
                tokenSymbol
            );
        }

        return _symbolDetailsAndSTData;
    }

    function getSymbolsDetailsAndSTData(string[] memory _symbols)
        public
        view
        returns (SymbolDetailsAndSTData[] memory)
    {
        SymbolDetailsAndSTData[] memory _symbolDetailsAndSTData = new SymbolDetailsAndSTData[](
            _symbols.length
        );

        for (uint256 index = 0; index < _symbols.length; index++) {
            _symbolDetailsAndSTData[index] = getSymbolDetailsAndSTData(
                _symbols[index]
            );
        }

        return _symbolDetailsAndSTData;
    }

    function getSymbolDetailsAndSTData(string memory _symbol)
        public
        view
        returns (SymbolDetailsAndSTData memory)
    {
        SymbolDetailsAndSTData memory symbolDetailsAndSTData;

        symbolDetailsAndSTData = SymbolDetailsAndSTData({
            symbolDetails: registeredTokenSymbols[_symbol],
            securityTokenData: tokenSymbolToSecurityTokenData[_symbol]
        });

        return symbolDetailsAndSTData;
    }

    function registerNewTokenSymbol(address _owner, string memory _symbol)
        public
        whenNotPaused
    {
        require(_owner != address(0), "Bad address");
        require(
            bytes(_symbol).length > 0 && bytes(_symbol).length <= 10,
            "Bad symbol"
        );

        string memory tokenSymbol = Util.upper(_symbol);

        require(tokenSymbolAvailable(tokenSymbol), "Symbol reserved");

        address previousOwner = _tokenSymbolOwner(_symbol);

        if (previousOwner != address(0)) {
            _deleteTokenSymbolOwnership(previousOwner, _symbol);
        }
        /*solium-disable-next-line security/no-block-members*/
        _addTokenSymbol(_owner, _symbol, now, now.add(expiryLimit));
    }

    function tokenSymbolAvailable(string memory _symbol)
        public
        view
        returns (bool)
    {
        if (_tokenSymbolOwner(_symbol) == address(0)) return true;

        return
            (now > registeredTokenSymbols[_symbol].expiryDate) &&
            !registeredTokenSymbols[_symbol].isDeployed;
    }

    function generateNewSecurityToken(
        string memory _name,
        string memory _symbol,
        string memory _tokenDetails
    ) public whenNotPaused {
        require(
            bytes(_name).length > 0 && bytes(_symbol).length > 0,
            "Bad ticker"
        );

        string memory _tokenSymbol = Util.upper(_symbol);

        address issuer = msg.sender;

        require(
            registeredTokenSymbols[_tokenSymbol].isReserved,
            "Token not reserved"
        );
        require(
            !registeredTokenSymbols[_tokenSymbol].isDeployed,
            "Token already deployed"
        );
        require(
            registeredTokenSymbols[_tokenSymbol].expiryDate >= now,
            "Symbol Reservation expired"
        );
        require(_tokenSymbolOwner(_tokenSymbol) == issuer, "Not authorised");

        registeredTokenSymbols[_tokenSymbol].isDeployed = true;

        address newSecurityTokenAddress = _deployToken(
            _name,
            _tokenSymbol,
            _tokenDetails,
            issuer
        );

        emit NewSecurityToken(
            _tokenSymbol,
            _name,
            newSecurityTokenAddress,
            issuer,
            now
        );
    }

    function isSecurityToken(address _securityToken)
        public
        view
        returns (bool)
    {
        return securityTokens[_securityToken].deployedAt > 0;
    }

    function changeSTFactory(address newSTFactory) public onlyOwner {
        STFactory = newSTFactory;
    }

    function STMinted() public {
        require(isSecurityToken(msg.sender), "Invalid ST address");
        securityTokens[msg.sender].isMinted = true;
        tokenSymbolToSecurityTokenData[securityTokens[msg.sender].symbol]
            .isMinted = true;
    }

    function _tokenSymbolOwner(string memory _symbol)
        internal
        view
        returns (address)
    {
        return registeredTokenSymbols[_symbol].owner;
    }

    function _deleteTokenSymbolOwnership(address _owner, string memory _symbol)
        internal
    {
        uint256 index = tokenSymbolIndex[_symbol];
        bytes32[] storage symbols = userToTokenSymbol[_owner];

        assert(index < symbols.length);
        assert(_tokenSymbolOwner(_symbol) == _owner);

        symbols[index] = symbols[symbols.length - 1];
        symbols.pop();

        if (symbols.length > index) {
            bytes32 switchedTicker = symbols[index];
            tokenSymbolIndex[Util.bytes32ToString(switchedTicker)] = index;
        }
    }

    function _addTokenSymbol(
        address _owner,
        string memory _symbol,
        uint256 _registrationDate,
        uint256 _expiryDate
    ) internal {
        _setTokenSymbolOwnership(_owner, _symbol);
        _storeTokenSymbolDetails(
            _symbol,
            _owner,
            _registrationDate,
            _expiryDate
        );
        emit RegisterTokenSymbol(
            _owner,
            _symbol,
            _registrationDate,
            _expiryDate
        );
    }

    function _setTokenSymbolOwnership(address _owner, string memory _symbol)
        internal
    {
        uint256 length = userToTokenSymbol[_owner].length;
        userToTokenSymbol[_owner].push(Util.stringToBytes32(_symbol));
        tokenSymbolIndex[_symbol] = length;
        // bytes32 seenKey = Encoder.getKey("seenUsers", _owner);
        // if (!getBoolValue(seenKey)) {
        //     pushArray(ACTIVE_USERS, _owner);
        //     set(seenKey, true);
        // }
    }

    function _storeTokenSymbolDetails(
        string memory _symbol,
        address _owner,
        uint256 _registrationDate,
        uint256 _expiryDate
    ) internal {
        registeredTokenSymbols[_symbol].symbol = _symbol;
        registeredTokenSymbols[_symbol].owner = _owner;
        registeredTokenSymbols[_symbol].registrationDate = _registrationDate;
        registeredTokenSymbols[_symbol].expiryDate = _expiryDate;
        registeredTokenSymbols[_symbol].isReserved = true;
    }

    function _deployToken(
        string memory _name,
        string memory _symbol,
        string memory _tokenDetails,
        address _issuer
    ) internal returns (address newSecurityTokenAddress) {
        newSecurityTokenAddress = ISTFactory(STFactory).deployToken(
            _name,
            _symbol,
            18,
            _tokenDetails,
            _issuer
        );

        /*solium-disable-next-line security/no-block-members*/
        _storeSecurityTokenData(
            newSecurityTokenAddress,
            _symbol,
            _name,
            _tokenDetails,
            now
        );

        tokenSymbolToSecurityTokenAddress[_symbol] = newSecurityTokenAddress;
        tokenSymbolToSecurityTokenData[_symbol] = securityTokens[newSecurityTokenAddress];

    }

    function _storeSecurityTokenData(
        address _securityToken,
        string memory _symbol,
        string memory _name,
        string memory _tokenDetails,
        uint256 _deployedAt
    ) internal {
        securityTokens[_securityToken] = SecurityTokenData({
            contractAddress: _securityToken,
            symbol: _symbol,
            name: _name,
            tokenDetails: _tokenDetails,
            deployedAt: _deployedAt,
            isMinted: false
        });
    }

}
