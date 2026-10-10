const {test,expect} = require("@playwright/test");
const ExcelJS=require('exceljs')
const filepath="/Users/Sabareesh/Downloads/Obsqura Testing.xlsx"

test("ExcelDemo", async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:'Table'}).click()
    await page.getByRole("link",{name:'Table Data Download'}).click()

    const downloadPromise = page.waitForEvent('download')
    await page.getByRole("button",{name:'Excel'}).click()
    const download = await downloadPromise

    await download.saveAs(filepath)
    await expect(download.suggestedFilename()).toContain(".xlsx")

    await writeExcelFile(filepath, "Bruno Nash", "Tokyo")

    await page.goto("https://the-internet.herokuapp.com/upload")
    await page.locator("#file-upload").setInputFiles(filepath)
    await page.getByRole("button",{name:'Upload'}).click()
    await expect(page.getByText("File Uploaded!")).toBeVisible()
    await expect(page.getByText("Obsqura Testing.xlsx")).toBeVisible()
    //await page.pause()
})

async function writeExcelFile(filepath,searchValue,changeValue)
{
    const workBook = new ExcelJS.Workbook()
    await workBook.xlsx.readFile(filepath)
    const workSheet = workBook.getWorksheet('Sheet1')
    const output=await readExcelFile(workSheet,searchValue)
    const cell=workSheet.getCell(output.row,output.col+2)
    cell.value=changeValue
    await workBook.xlsx.writeFile(filepath)
}

async function readExcelFile(workSheet,searchValue)
{
  
  let output={row:-1,col:-1}
    workSheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            //console.log(cell.value)
            if(cell.value===searchValue)
            {
                output.row=rowNumber
                output.col=colNumber
            }
        })
    }
    )
    return output
}