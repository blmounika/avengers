export interface User {
    userId: number;
    firstName: string;
    email: string;
    pwd: string;
    lastName: string;
    pwdExpiry : string;
    pwdReset: any;
    pinCode: number;
    address: string;
    phoneNum: number;
    altPhoneNum?: number;
    logindate: string;
}

const user: User = {
    userId: 0,
    firstName: '',
    email: '',
    pwd: '',
    lastName: '',
    pwdExpiry: '',
    pwdReset: '',
    pinCode: 0,
    address: '',
    phoneNum: 0,
    altPhoneNum: 0,
    logindate: '',
};
