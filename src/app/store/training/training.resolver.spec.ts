import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { trainingResolver } from './training.resolver';

describe('trainingResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => trainingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
