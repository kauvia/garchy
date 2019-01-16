quantmoddata <- function(ticker){
  stockdata = getSymbols(ticker,auto.assign = FALSE);
  return(stockdata);
  }
