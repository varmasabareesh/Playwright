import { test as baseTest } from "@playwright/test"
interface TestDataForOrder2{
            username:string,
            password:string,
            productname:string
}
export const customTest=baseTest.extend<{TestDataForOrder:TestDataForOrder2}>(
    {
        TestDataForOrder:{ 
            username:"standard_user",
            password:"secret_sauce",
            productname:"Sauce Labs Backpack"
        }
    }
)
