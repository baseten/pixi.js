import { isWebGPUSupported } from '../browser/isWebGPUSupported';
import { DOMAdapter } from '~/environment';

describe('isWebGPUSupported', () =>
{
    it('should destroy the device it requests to check support', async () =>
    {
        const device = { destroy: jest.fn() };
        const adapter = { requestDevice: jest.fn().mockResolvedValue(device) };
        const gpu = { requestAdapter: jest.fn().mockResolvedValue(adapter) } as unknown as GPU;
        const spy = jest.spyOn(DOMAdapter.get(), 'getNavigator').mockReturnValue({ userAgent: '', gpu });

        expect(await isWebGPUSupported()).toBe(true);
        expect(adapter.requestDevice).toHaveBeenCalledTimes(1);
        expect(device.destroy).toHaveBeenCalledTimes(1);

        spy.mockRestore();
    });
});
