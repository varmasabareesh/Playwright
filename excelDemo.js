const ExcelJS=require('exceljs')
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
//readExcelFile()
writeExcelFile("/Users/Sabareesh/Downloads/Obsqura Testing.xlsx","Bruno Nash","Tokyo")