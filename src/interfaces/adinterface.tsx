export interface RespAD {
    status:                            number;
    givenName:                         string;
    middleName:                        null;
    surname:                           string;
    emailAddress:                      string;
    voiceTelephoneNumber:              string;
    employeeId:                        null;
    advancedSearchFilter:              AdvancedSearchFilter;
    enabled:                           boolean;
    accountLockoutTime:                null;
    lastLogon:                         Date;
    permittedWorkstations:             any[];
    permittedLogonTimes:               null;
    accountExpirationDate:             null;
    smartcardLogonRequired:            boolean;
    delegationPermitted:               boolean;
    badLogonCount:                     number;
    homeDirectory:                     null;
    homeDrive:                         null;
    scriptPath:                        null;
    lastPasswordSet:                   Date;
    lastBadPasswordAttempt:            Date;
    passwordNotRequired:               boolean;
    passwordNeverExpires:              boolean;
    userCannotChangePassword:          boolean;
    allowReversiblePasswordEncryption: boolean;
    certificates:                      Certificate[];
    context:                           Context;
    contextType:                       number;
    description:                       null;
    displayName:                       string;
    samAccountName:                    string;
    userPrincipalName:                 string;
    sid:                               Sid;
    guid:                              string;
    distinguishedName:                 string;
    structuralObjectClass:             string;
    name:                              string;
}

export interface AdvancedSearchFilter {
}

export interface Certificate {
    archived:           boolean;
    extensions:         Extension[];
    friendlyName:       string;
    hasPrivateKey:      boolean;
    privateKey:         null;
    issuerName:         Name;
    notAfter:           Date;
    notBefore:          Date;
    publicKey:          PublicKey;
    rawData:            string;
    rawDataMemory:      RawDataMemory;
    serialNumber:       string;
    signatureAlgorithm: SignatureAlgorithm;
    subjectName:        Name;
    thumbprint:         string;
    version:            number;
    handle:             Handle;
    issuer:             string;
    subject:            string;
    serialNumberBytes:  RawDataMemory;
}

export interface Extension {
    critical:                  boolean;
    oid:                       SignatureAlgorithm;
    rawData:                   string;
    enhancedKeyUsages:         SignatureAlgorithm[] | null;
    keyUsages:                 number | null;
    subjectKeyIdentifier:      null | string;
    subjectKeyIdentifierBytes: RawDataMemory | null;
    keyIdentifier:             RawDataMemory | null;
    namedIssuer:               null;
    rawIssuer:                 null;
    serialNumber:              null;
}

export interface SignatureAlgorithm {
    value:        null | string;
    friendlyName: null | string;
}

export interface RawDataMemory {
    length:  number;
    isEmpty: boolean;
}

export interface Handle {
    value: number;
}

export interface Name {
    nameName: null;
    oid:      SignatureAlgorithm;
    rawData:  string;
}

export interface PublicKey {
    encodedKeyValue:   Encoded;
    encodedParameters: Encoded;
    key:               Key;
    oid:               SignatureAlgorithm;
}

export interface Encoded {
    oid:     SignatureAlgorithm;
    rawData: string;
}

export interface Key {
    legalKeySizes:        LegalKeySize[];
    keyExchangeAlgorithm: string;
    signatureAlgorithm:   string;
    keySize:              number;
}

export interface LegalKeySize {
    minSize:  number;
    maxSize:  number;
    skipSize: number;
}

export interface Context {
    contextType:     number;
    name:            string;
    container:       null;
    userName:        null;
    options:         number;
    connectedServer: string;
}

export interface Sid {
    binaryLength:     number;
    accountDomainSid: AccountDomainSid;
    value:            string;
}

export interface AccountDomainSid {
    binaryLength: number;
    value:        string;
}
