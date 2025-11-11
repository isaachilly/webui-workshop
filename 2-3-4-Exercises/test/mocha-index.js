import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

let browser;
let page;
let serverProcess;

describe('Test index.js components', () => {

  before(async () => {
    serverProcess = spawn('node', ['index.js']);
    serverProcess.stderr.on('data', (data) => {
      console.error(`Server stderr: ${data}`);
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    browser = await puppeteer.launch({timeout: 10000, args: ['--no-sandbox', '--disable-setuid-sandbox']}); // no sandbox is for CI environment GH actions, look into
    page = await browser.newPage();
  });

it('Connected to application successfully', async () => {
    await page.goto('http://localhost:8080')
    const title = await page.title()
    expect(title).to.equal('WebUI Workshop - 2023');
});

it('Successfully created Homepage buttons', async () => {
    await page.goto('http://localhost:8080/?page=home');
    await page.waitForSelector('body');
    const homeButton = await page.$('#get-username-button');
    expect(homeButton).to.exist;
    
    const aboutButton = await page.$('#about-button');
    expect(aboutButton).to.exist;
});

it('Homepage buttons have correct classes', async () => {
    await page.goto('http://localhost:8080/?page=home');
    await page.waitForSelector('body');
    const homeButton = await page.$('#get-username-button');
    const homeButtonClasses = await page.evaluate(button => button.className, homeButton);
    expect(homeButtonClasses).to.include('btn');
    expect(homeButtonClasses).to.include('btn-primary');
    const aboutButton = await page.$('#about-button');
    const aboutButtonClasses = await page.evaluate(button => button.className, aboutButton);
    expect(aboutButtonClasses).to.include('btn');
    expect(aboutButtonClasses).to.include('btn-primary');
});

it('Navigates to About page on About button click', async () => {
    await page.goto('http://localhost:8080/?page=home');
    await page.waitForSelector('#about-button');
    await page.click('#about-button');
    const url = page.url();
    expect(url).to.include('page=about');
});

it('Navigates to Home page on Home button click', async () => {
    await page.goto('http://localhost:8080/?page=about');
    await page.waitForSelector('#home-button');
    await page.click('#home-button');
    const url = page.url();
    expect(url).to.include('page=home');
});

it('Displays username on Get Username button click', async () => {
    await page.goto('http://localhost:8080/?page=home');
    await page.waitForSelector('#get-username-button');
    await page.click('#get-username-button');
     await page.waitForFunction(() => {
        const display = document.querySelector('#username-display');
        return display && display.textContent.includes('anonymous');
    });
    
    const usernameText = await page.$eval('#username-display', p => p.textContent);
    expect(usernameText).to.include('anonymous');
});

it('Displays application data status on Request Application Data button click', async () => {
    await page.goto('http://localhost:8080/?page=about');
    const button = await page.waitForSelector('#request-application-data-button');
    await button.click();
    await page.waitForFunction(() => {
        const statusDisplay = document.querySelector('#application-data-status-display');
        return statusDisplay && statusDisplay.textContent.includes('successfully');
    });
    
    const statusText = await page.$eval('#application-data-status-display', p => p.textContent);
    expect(statusText).to.include('successfully');
});


after(async () => { 
    if (page && !page.isClosed()) {
        await page.close();
    }

    if (browser) {
      await browser.close();
    }
    
    if (serverProcess) {
      serverProcess.kill();
    }
});

});
