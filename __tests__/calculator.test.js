import { mount } from '@vue/test-utils';
import Calculator from '../src/components/Calculator.vue';

describe('Calculator', () => {
	test('should have calculator-class', () => {
		const wrapper = mount(Calculator);

		expect(typeof Calculator.data).toBe('function');
	});
});
