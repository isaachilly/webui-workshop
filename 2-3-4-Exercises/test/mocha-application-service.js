import { expect } from 'chai';
import ApplicationService from '../lib/ApplicationService.js'; // adjust path as needed

describe('ApplicationService', () => {
  let appService;
  const mockDetails = {
    appName: '2-3-4 Exercises Application',
  };

  beforeEach(() => {
    appService = new ApplicationService(mockDetails);
  });

  it('should be initialized', () => {
    expect(appService).to.exist;
    expect(appService.details).to.exist;
  });

  it('getDetails() should return the expected details JSON object', async () => {

    const returnedData = await appService.getDetails();

    expect(returnedData).to.deep.equal(mockDetails);
  });
});
