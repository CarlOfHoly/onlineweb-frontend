import { configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from 'articles/slices/articles';
import { careerLocationsReducer } from 'career/slices/careerLocations';
import { careerOpportunitiesReducer } from 'career/slices/careerOpportunities';
import { jobTypesReducer } from 'career/slices/jobTypes';
import { companiesReducer } from 'companies/slices/companies';
import { attendanceEventsReducer } from 'events/slices/attendanceEvents';
import { attendeesReducer } from 'events/slices/attendees';
import { eventsReducer } from 'events/slices/events';
import { ruleBundlesReducer } from 'events/slices/ruleBundles';
import { onlineGroupsReducer } from 'groups/slices/onlineGroups';
import { transactionsReducer } from 'payments/reducers/transactions';
import { paymentsReducer } from 'payments/slices/payments';
import { shopReducer } from 'shop/reducers';
import { publicAttendeesReducer } from 'events/slices/publicAttendees';
import { webshopProductsReducer } from 'webshop/slices/products';
import { webshopProductSizesReducer } from 'webshop/slices/productSize';
import { webshopProductCategoriesReducer } from 'webshop/slices/productCategory';

export const initStore = (initialState: {} = {}) => {
  return configureStore({
    preloadedState: initialState,
    /* eslint sort-keys: "error" */
    reducer: {
      articles: articlesReducer,
      attendanceEvents: attendanceEventsReducer,
      attendees: attendeesReducer,
      careerLocations: careerLocationsReducer,
      careerOpportunities: careerOpportunitiesReducer,
      companies: companiesReducer,
      events: eventsReducer,
      jobTypes: jobTypesReducer,
      onlineGroups: onlineGroupsReducer,
      payments: paymentsReducer,
      publicAttendees: publicAttendeesReducer,
      ruleBundles: ruleBundlesReducer,
      shop: shopReducer,
      transactions: transactionsReducer,
      webshopProductCategories: webshopProductCategoriesReducer,
      webshopProducts: webshopProductsReducer,
      webshopProductSizes: webshopProductSizesReducer,
    },
    /* eslint sort-keys: "off" */
  });
};

export const store = initStore();

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Store = typeof store;
