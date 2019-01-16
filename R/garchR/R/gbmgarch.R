gbmgarch <- function(ticker){
stockdata <- quantmoddata(ticker);
stockdata <- stockdata[,1];
length = length(stockdata)
returns = returns(stockdata);
gspec = ugarchspec();
gfit = ugarchfit(spec=gspec,data=returns);
gfore <- ugarchforecast(gfit,n.ahead=1);
sigma = sigma(gfore);
theta = theta(returns);
gbm = GBM(N=2,sigma = c(sigma),theta=c(theta), x0=c(tail(stockdata,n=1)));
stockdata <- c(stockdata, xts(as.integer(gbm[2]),end(stockdata)+1));
return(stockdata)
}
returns <- function(prices){
  rets <- dailyReturn(prices)
  return(rets)
}
sigma <- function(forecast){
  siggy = c(forecast@forecast$sigmaFor);
  return(siggy)
}
theta <- function(returns){
  thety = mean(returns)
  return(thety)
}
