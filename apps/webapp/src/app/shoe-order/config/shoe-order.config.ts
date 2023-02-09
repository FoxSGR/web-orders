import { ShoeOrder, WOEntityConfig } from '../../common';
import { ShoeOrderService } from '../shoe-order.service';
import { shoeOrderListConfig } from './shoe-order.list.config';
import { shoeOrderPreview } from './shoe-order.preview';
import { shoeOrderWizard } from './shoe-order.wizard';

@WOEntityConfig<ShoeOrder>({
  entityType: 'shoe-order',
  label: shoeOrder => shoeOrder.sample?.sampleModel?.reference,
  icon: 'cube',
  route: 'shoe-order',
  serviceClass: ShoeOrderService,
  listConfig: shoeOrderListConfig,
  wizardConfig: shoeOrderWizard,
  previewConfig: shoeOrderPreview,
})
export class ShoeOrderListConfig {}
