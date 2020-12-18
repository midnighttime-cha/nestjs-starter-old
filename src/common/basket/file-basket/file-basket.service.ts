import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileBasketDTO, FileBasketRO } from '../dto/file-basket.dto';
import { FileBaskets } from '../entities/file-basket.entity';

@Injectable()
export class FileBasketService {
  constructor(
    @InjectRepository(FileBaskets) private readonly mainRepositories: Repository<FileBaskets>
  ) { }

  // Methode POST
  async create(module: string, moduleId: number, data: FileBasketDTO[]): Promise<FileBasketRO[]> {
    try {
      let items = [];
      await this.mainRepositories.delete({ moduleId, module });
      await data.forEach((async element => {
        const created = await this.mainRepositories.create({ ...element, moduleId, module });
        await this.mainRepositories.save(created);
        await items.push(created);
      }));
      return await items;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getFiles(module: string, moduleId: number, lang = '') {
    try {
      let items = [];
      items = await this.mainRepositories.find({ moduleId, module });
      if (lang != '') {
        items = await items.map(element => {
          return {
            id: element.id,
            orgname: element.orgname,
            filename: element.filename,
            thumbName: element.thumbName,
            filePath: element.filePath,
            thumbPath: element.thumbPath,
            caption: element[`caption${lang}`],
            describe: element[`describe${lang}`],
            imageURL: `${process.env.API_HOST_IMGFILE}/${element.filePath}/${element.filename}`,
            thumbURL: `${process.env.API_HOST_IMGFILE}/${element.thumbPath}/${element.thumbName}`
          }
        });
      }
      return items;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
