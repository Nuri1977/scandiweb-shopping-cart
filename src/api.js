import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const apiClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const CATEGORY_NAMES_QUERY = gql`
  query CategoryNames {
    categories {
      name
    }
  }
  `;

export const fetchCategoryNames = async () => {
  const res = await apiClient.query({ query: CATEGORY_NAMES_QUERY });
  return res.data.categories;
};

const CATEGORY_PRODUCTS_QUERY = gql`
  query CategoryProducts($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

export const fetchCategoryProducts = async (categoryName) => {
  const res = await apiClient.query({
    query: CATEGORY_PRODUCTS_QUERY,
    variables: { title: categoryName },
  });
  return res.data.category.products;
};

const CURRENCY_OPTIONS_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
export const fetchCurrencyOptions = async () => {
  const res = await apiClient.query({ query: CURRENCY_OPTIONS_QUERY });
  return res.data.currencies;
};

const PRODUCT_INFO_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      description
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;

export const fetchProductInfo = async (productId) => {
  return apiClient.query({
    query: PRODUCT_INFO_QUERY,
    variables: { id: productId },
  });
};

export default apiClient;