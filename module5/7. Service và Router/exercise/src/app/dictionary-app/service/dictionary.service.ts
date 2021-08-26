import {Injectable} from '@angular/core';
import {IWord} from '../model/iword';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  words: IWord[] = [{
    word: 'hello',
    mean: 'xin chào'
  }, {
    word: 'goodbye',
    mean: 'tạm biệt'
  }, {
    word: 'morning',
    mean: 'buổi sáng'
  }];

  constructor() {
  }

  getAll() {
    return this.words;
  }

  translate(word: string) {
    return this.words.find(item => item.word === word);
  }
}
