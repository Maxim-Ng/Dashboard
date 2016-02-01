// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import DeployFromFileController from 'deploy/deployfromfile_controller';
import deployModule from 'deploy/deploy_module';

describe('DeployFromFile controller', () => {
  /** @type {!DeployFromFileController} */
  let ctrl;
  /** @type {!angular.$resource} */
  let mockResource;
  /** @type {!angular.FormController} */
  let form;

  beforeEach(() => {
    angular.mock.module(deployModule.name);

    angular.mock.inject(($controller) => {
      mockResource = jasmine.createSpy('$resource');
      ctrl = $controller(DeployFromFileController, {$resource: mockResource}, {form: form});
    });
  });

  it('should deploy with file name and content', () => {
    // given
    let resourceObject = {
      save: jasmine.createSpy('save'),
    };
    ctrl.file.name = "test.yaml";
    ctrl.file.content = "test_content";
    mockResource.and.returnValue(resourceObject);
    resourceObject.save.and.callFake((spec) => {
      // then
      expect(spec.name).toBe("test.yaml");
      expect(spec.content).toBe('test_content');
    });
    // when
    ctrl.deploy();

    // then
    expect(resourceObject.save).toHaveBeenCalled();
  });

});
