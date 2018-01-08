/*import {OrderList} from '../app/models/order.model';
import {Butler} from '../app/models/product.model';*/

export const ORDERLIST: any[] = [
  {
    id: 'DX000001',
    amount: 36000,
    payState: {
      paid: false,
      type: 0,
      period: [
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: 1515400329000,
            paidAt: 1515400329000,
            expireAt: 1515400329000
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: 1515400329000,
            paidAt: 1515400329000,
            expireAt: 1515400329000
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: 1515400329000,
            paidAt: 1515400329000,
            expireAt: 1515400329000
          }
        }
      ]
    },
    meta: {
      createAt: 1515400329000,
      updateAt: 1515400329000,
      expireAt: 1515400329000
    },
    items: [
      {
        id: '001',
        type: 1,
        serviceType: '健身教练',
        name: '黑寡妇',
        age: 40,
        sex: 0,
        height: 167,
        weight: 52,
        experience: 10,
        skill: [],
        avatar: '/assets/images/avatars/1.jpg',
        post: '/assets/images/butlers/1.jpg',
        price: '12000',
        origin: '美国',
        level: 2,
        like: false,
        meta: {
          createAt: 1515400329000,
          updateAt: 1515400329000,
          expireAt: 1515400329000
        },
      },
      {
        id: '002',
        type: 1,
        serviceType: '安全保障',
        name: '钢铁侠',
        age: 40,
        sex: 1,
        height: 178,
        weight: 72,
        experience: 9,
        skill: [],
        avatar: '/assets/images/avatars/2.jpg',
        post: '/assets/images/butlers/2.jpg',
        price: '12000',
        origin: '美国',
        level: 1,
        like: false,
        meta: {
          createAt: 1515400329000,
          updateAt: 1515400329000,
          expireAt: 1515400329000
        },
      }
    ]
  },
  {
    id: 'DX000002',
    amount: 36000,
    payState: {
      paid: false,
      type: 0,
      period: [
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: 1515400329000,
            paidAt: 1515400329000,
            expireAt: 1515400329000
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: 1515400329000,
            paidAt: 1515400329000,
            expireAt: 1515400329000
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: 1515400329000,
            paidAt: 1515400329000,
            expireAt: 1515400329000
          }
        }
      ]
    },
    meta: {
      createAt: 1515400329000,
      updateAt: 1515400329000,
      expireAt: 1515400329000
    },
    items: [
      {
        id: '002',
        type: 1,
        serviceType: '安全保障',
        name: '钢铁侠',
        age: 40,
        sex: 0,
        height: 178,
        weight: 72,
        experience: 9,
        skill: [],
        avatar: '/assets/images/avatars/2.jpg',
        post: '/assets/images/butlers/2.jpg',
        price: '12000',
        origin: '美国',
        level: 2,
        like: false,
        meta: {
          createAt: 1515400329000,
          updateAt: 1515400329000,
          expireAt: 1515400329000
        },
      }
    ]
  }
];
