import { AppDataSource } from '../config/database';
import { Practitioner } from '../models/Practitioner';

export class PractitionerService {
    private repository = AppDataSource.getRepository(Practitioner);

    // Move all business logic here
    async create(data: Partial<Practitioner>): Promise<Practitioner> {
        const practitioner = this.repository.create(data);
        return await this.repository.save(practitioner);
    }

    async getAll(): Promise<Practitioner[]> {
        return await this.repository.find();
    }

    async getById(id: string): Promise<Practitioner | null> {
        return await this.repository.findOneBy({ practitioner_id: id });
    }

    async update(id: string, data: Partial<Practitioner>): Promise<Practitioner | null> {
        const practitioner = await this.getById(id);
        if (!practitioner) return null;
        
        this.repository.merge(practitioner, data);
        return await this.repository.save(practitioner);
    }

    async delete(id: string): Promise<boolean> {
        const practitioner = await this.getById(id);
        if (!practitioner) return false;
        
        practitioner.isActive = false;
        await this.repository.save(practitioner);
        return true;
    }
}
