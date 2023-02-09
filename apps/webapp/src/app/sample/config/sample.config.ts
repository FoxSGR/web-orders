import { ShoeSample, WOEntityConfig } from '../../common';
import { SampleService } from '../sample.service';
import { sampleListConfig } from './sample.list.config';
import { sampleWizard } from './sample.wizard';
import { samplePreview } from './sample.preview';

@WOEntityConfig<ShoeSample>({
  entityType: 'sample',
  label: sample => sample.sampleModel?.reference,
  route: 'sample',
  serviceClass: SampleService,
  listConfig: sampleListConfig,
  wizardConfig: sampleWizard,
  previewConfig: samplePreview,
})
export class SampleListConfig {}
