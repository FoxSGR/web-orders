import { ShoeOrder, WOEntityConfig } from '../../common';
import { ShoeOrderService } from '../shoe-order.service';
import { shoeOrderListConfig } from './shoe-order.list.config';
import { shoeOrderWizard } from './shoe-order.wizard';

@WOEntityConfig<ShoeOrder>({
  entityType: 'shoe-order',
  label: shoeOrder => shoeOrder.sample?.sampleModel?.reference,
  route: 'shoe-order',
  serviceClass: ShoeOrderService,
  listConfig: shoeOrderListConfig,
  wizardConfig: shoeOrderWizard,
  // previewConfig: shoeOrderPreview,
})
export class ShoeOrderListConfig {}
