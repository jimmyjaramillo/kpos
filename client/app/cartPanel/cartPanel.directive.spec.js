'use strict';

describe('Directive: cartPanel', function () {

  // load the directive's module and view
  beforeEach(module('kposApp'));
  beforeEach(module('app/cartPanel/cartPanel.html'));

  var element, scope, cartService,ctrl;

  beforeEach(inject(function ($rootScope, _cartService_) {
    scope = $rootScope.$new();
    cartService= _cartService_;
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-panel></cart-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cartPanel directive');
  }));

  /*
   * TODO: Should render a cart with subtotal, tax and total
   * - call cartService getCart on init
   * - Should have a customer, even 'consumidor final'
   **/

  it('should render a cart', inject(function ($compile) {
    element = angular.element('<cart-panel></cart-panel>');
    spyOn(cartService, 'getCart');
    element = $compile(element)(scope);
    scope.$digest();
    ctrl = element.controller('cartPanel');
    expect(cartService.getCart).toHaveBeenCalled();
  }));

  /*
   * TODO: Should allow to change the client from the dropdown
   * and reset the discounts
   * */

  /*
   * TODO: Should allow to change the quantity
   * and reset the discounts
   * */

  /*
   * TODO: Should allow to delete the entire item row
   * and reset the discounts
   * */

  /*
   * TODO: Should open the new client modal to create new
   * clients
   * */

  /*
   * TODO: Should add discount if the selected client has
   * discount, should call cartService to add a new
   * discount, the api should be:
   * /api/discounts?_id='byo' returns a nounce for the discount
   * in this cart. This should be POST to add the cart
   * */

  /*
   * TODO: Should not add a discount if the api denies
   * the discount maybe /api/discounts?_id='byo' returns
   * not allowed.
   * */

  /*
   * TODO; Deberia permitir agregar otro tipo de descuento
   * ej. BYO (bring your own mug)
   * */

});
