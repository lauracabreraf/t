import { PartialType } from '@nestjs/mapped-types';
import { CreateSubtareaDto } from './create-subtarea.dto';

export class UpdateSubtareaDto extends PartialType(CreateSubtareaDto) {}
