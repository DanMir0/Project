import { expect } from "chai";
import api from "@/services/api";

describe('Counterparties API', () => {
    it('should return array on list', async () => {
        await expect(Array.isArray(api.counterparties.list())).true('eee');
    });
});


