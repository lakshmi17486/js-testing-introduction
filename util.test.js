const puppeteer = require('puppeteer')
const { generateText, checkAndGenerate} = require('./util')

//unit testing
test('should output name and age' , () => {
    const text = generateText('Anna', 35)
    expect(text).toBe('Anna (35 years old)');
    
})

test('should output data-less text', () => {
    const text = generateText('Anna', '')
    expect(text).toBe('Anna ( years old)')
})

test('should output null text', () => {
    const text = generateText()
    expect(text).toBe('undefined (undefined years old)')
})

//integration testing
test('should generate valid text output', () => {
    const text = checkAndGenerate('Anna', 30);
    expect(text).toBe('Anna (30 years old)')
})

// end to end  testing
test('should reate an element with text and correct class', async() => {
    const browser = await puppeteer.launch({
        headless: false,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto(
        'file:///C:/Users/laksh/Desktop/study/js-testing-introduction/js-testing-introduction/index.html')
    
    await page.click('input#name')
    await page.type('input#name', 'Anna')
    await page.click('input#age')
    await page.type('input#age', '30')
    await page.click('#btnAddUser')
    
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (30 years old)')
}, 10000)
