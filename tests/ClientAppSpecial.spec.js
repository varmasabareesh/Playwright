const { test,expect } = require("@playwright/test");

test("@web ClientApp login using Special locators", async({page})=>{
    await page.goto("https://www.saucedemo.com/")
    //await page.locator("#user-name").fill("standard_user")
    await page.getByPlaceholder("Username").fill("standard_user")
    //await page.locator("#password").fill("secret_sauce")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    // await page.locator("#login-button").click()
    await page.getByRole("button",{name:'Login'}).click()
    await page.waitForLoadState('networkidle')
    await page.locator(".inventory_item_name").first().waitFor()
    const titles=await page.locator(".inventory_item_name").allTextContents()
    console.log(titles)
    const productName = "Sauce Labs Backpack"
    const product = page.locator(".inventory_item_name")
    const count = await product.count()
    console.log(count)
    for(let i=0;i<count;i++)
    {
        if(await product.nth(i).textContent()===productName)
        {
            //await page.locator(".inventory_item").nth(i).locator("text=Add to cart").click()
            await page.locator(".inventory_item").nth(i).getByRole("button",{name:'Add to cart'}).click()
            break
        }
    }
        await page.locator("#shopping_cart_container").click()
        //await page.locator("#checkout").click()
        await page.getByRole("button",{name:'Checkout'}).click()
        //await page.locator("#first-name").fill("Sabareesh")
        await page.getByPlaceholder("First Name").fill("Sabareesh")
        //await page.locator("#last-name").fill("Varma")
        await page.getByPlaceholder("Last Name").fill("Varma")
        //await page.locator("#postal-code").fill("682301")
        await page.getByPlaceholder("Zip/Postal Code").fill("682301")
        //await page.locator("#continue").click()
        await page.getByRole("button",{name:'Continue'}).click()
        await page.locator(".inventory_item_name").waitFor()
        //await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99")
        await expect(page.getByText("Item total: $29.99")).toHaveText("Item total: $29.99")
        //await page.locator("#finish").click()
        await page.getByRole("button",{name:'Finish'}).click()
        //await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
        await expect(page.getByText("Thank you for your order!")).toHaveText("Thank you for your order!")
        //await page.pause()
})
