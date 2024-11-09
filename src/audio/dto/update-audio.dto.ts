import { PartialType } from '@nestjs/mapped-types';
import { CreateAudioBookDto } from './create-audio.dto';

export class UpdateAudioDto extends PartialType(CreateAudioBookDto) {}
