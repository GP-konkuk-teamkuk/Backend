import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
	@ApiProperty()
	image: string;

	@ApiProperty()
	text: string;

	@ApiProperty()
	title: string;
}
