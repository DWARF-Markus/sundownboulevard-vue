import Calculator from '../src/components/Calculator.vue';

describe('Calculator', () => {
	// Inspect the raw component options
	it('has data that is a function', () => {
		expect(typeof Calculator.data).toBe('function');
	});
});
