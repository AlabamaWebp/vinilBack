import { Test, TestingModule } from '@nestjs/testing';
import { NoauthController } from './noauth.controller';

describe('NoauthController', () => {
  let controller: NoauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoauthController],
    }).compile();

    controller = module.get<NoauthController>(NoauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
