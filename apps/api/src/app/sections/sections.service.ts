import { Injectable, NotFoundException } from '@nestjs/common';
import { SECTION_DEFINITIONS, SectionInstance, SectionType } from '@my-org/schema';
import { createId } from '@my-org/utils';

@Injectable()
export class SectionsService {
  private readonly sections: SectionInstance[] = [];

  list() {
    return this.sections;
  }

  getById(id: string) {
    const section = this.sections.find((item) => item.id === id);
    if (!section) {
      throw new NotFoundException(`Section ${id} not found`);
    }
    return section;
  }

  create(input: { type: SectionType; name?: string }) {
    const definition = SECTION_DEFINITIONS.find((item) => item.type === input.type);
    if (!definition) {
      throw new NotFoundException(`Section type ${input.type} not found`);
    }

    const section: SectionInstance = {
      id: createId('section'),
      type: definition.type,
      name: input.name || `${definition.label} ${this.sections.length + 1}`,
      props: structuredClone(definition.defaultProps),
      status: 'draft',
    };

    this.sections.push(section);
    return section;
  }

  update(id: string, input: Partial<SectionInstance>) {
    const section = this.getById(id);
    const updated: SectionInstance = {
      ...section,
      ...input,
      id: section.id,
      type: section.type,
    };

    const index = this.sections.findIndex((item) => item.id === id);
    this.sections[index] = updated;
    return updated;
  }
}
