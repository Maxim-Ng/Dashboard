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

import jobModule from 'job/module';

describe('Job Card List controller', () => {
  /** @type {!JobCardListController} */
  let ctrl;
  /** @type {!NamespaceService} */
  let data;
  /*@type {!ScaleService}*/
  let scaleData;

  beforeEach(() => {
    angular.mock.module(jobModule.name);

    angular.mock.inject(($componentController, kdNamespaceService, kdScaleService) => {
      /** @type {!NamespaceService} */
      data = kdNamespaceService;
      /** @type {!ScaleService} */
      scaleData = kdScaleService;
      /** @type {!JobCardListController} */
      ctrl = $componentController(
          'kdJobCardList', {kdNamespaceService_: data, kdScaleService_: scaleData});
    });
  });

  it('should instantiate the controller properly', () => {
    expect(ctrl).not.toBeUndefined();
  });

  it('should return the value from Namespace service', () => {
    expect(ctrl.areMultipleNamespacesSelected()).toBe(data.areMultipleNamespacesSelected());
  });

  it('should return correct select id', () => {
    // given
    let expected = 'jobs';
    ctrl.jobList = {};
    ctrl.jobListResource = {};

    // when
    let got = ctrl.getSelectId();

    // then
    expect(got).toBe(expected);
  });

  it('should return empty select id', () => {
    // given
    let expected = '';

    // when
    let got = ctrl.getSelectId();

    // then
    expect(got).toBe(expected);
  });
});
