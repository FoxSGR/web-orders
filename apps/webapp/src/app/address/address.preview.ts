import { EntityPreviewGroup } from '../common';

export const contactsPreview: EntityPreviewGroup = {
  columns: 1,
  header: {
    title: 'str.common.contacts',
  },
  type: 'groups',
  items: [
    {
      header: {
        title: 'str.entity.preview.common.seeContacts',
        icon: 'megaphone',
      },
      columns: 1,
      collapsable: true,
      collapsed: true,
      items: [
        {
          icon: 'call',
          label: 'str.common.contact',
          value: 'phoneNumber',
        },
        {
          icon: 'card',
          label: 'str.common.vat',
          value: 'vat',
        },
        {
          icon: 'document',
          label: 'str.common.address.line1',
          value: 'address.line1',
        },
        {
          icon: 'document',
          label: 'str.common.address.line2',
          value: 'address.line2',
        },
        {
          icon: 'document',
          label: 'str.common.address.city',
          value: 'address.city',
        },
        {
          icon: 'document',
          label: 'str.common.address.zipCode',
          value: 'address.zipCode',
        },
        {
          icon: 'document',
          label: 'str.common.address.country',
          value: 'address.country',
        },
      ],
    },
  ],
};
