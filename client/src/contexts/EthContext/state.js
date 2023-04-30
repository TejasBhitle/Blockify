const actions = {
  init: "INIT"
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  account: null,
  userName: null,
  balance: null,
  currencySymbol: null,
  networkID: null,
  networkName: null,
  contract: null,
  ipfsClient: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
