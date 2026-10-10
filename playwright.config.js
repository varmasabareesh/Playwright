const config = ({
  testDir:'./tests',
  timeout:60*1000,
  expect:{
    timeout:60*1000
  },
  reporter:'html',
  use:{
    browserName:'chromium',
    headless:!!process.env.CI,
    screenshot:'on',
    trace:'on',
    video:'on'
  },
})
module.exports=config