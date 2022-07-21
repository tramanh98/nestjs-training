import { Injectable } from '@nestjs/common';

@Injectable() /// Injectable
export class UserService {
  constructor() {
    console.log('hellllllllllo user');
  }
}
