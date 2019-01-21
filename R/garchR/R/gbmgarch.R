gbmgarch <- function(ticker){
  require("ggplot2");
  require("quantmod");
  require("rugarch");
  require("Sim.DiffProc");
  require("timetk");
  require("jsonlite")
 stockdata <- quantmoddata(ticker);
  stockdata <- stockdata[,1];
  forecastlength <- 1:1;
  trajectories <- 1:99;

  gspec = ugarchspec();
  #for (i in seq_along(forecastlength)){
  length = length(stockdata);
  returns = returns(stockdata);
  gbmDatesInit <- seq(from=end(returns)+1,to=end(returns)+1,by='day');
  gfit = ugarchfit(spec=gspec,data=returns);
  #forecasting and gbm generation
  gfore <- ugarchforecast(gfit,n.ahead=1);
  sigma = sigma(gfore);
  theta = theta(returns);
  gbm = GBM(N=30,M=1,sigma = c(sigma),theta=c(theta), x0=c(tail(stockdata,n=1)));
  gbm <- gbm[-1,];
  stockdataforecast <- stockdata;
  for (i in gbm){
    stockdataforecast <- c(stockdataforecast,xts(as.integer(i),end(stockdataforecast)+1));
  }
for (i in trajectories){
  tmpforecast <- stockdata;
  gforetemp <- ugarchforecast(gfit,n.ahead=1);
  sigmatemp = sigma(gforetemp);
  gbmtemp = GBM(N=30,M=1,sigma = c(sigmatemp),theta=c(theta), x0=c(tail(stockdata,n=1)));
  gbmtemp <- gbmtemp[-1,];
  for (i in gbmtemp){
    tmpforecast <- c(tmpforecast,xts(as.integer(i),end(tmpforecast)+1));
  }
  stockdataforecast <- merge(stockdataforecast,tmpforecast);
  }

  # gbm <- merge(gbm,gbmDatesInit);
  #  gbm <- gbm[2,];
  #  gbm <- tk_xts(gbm);


  #  stockdata <- c(stockdata, xts(as.integer(gbm[2]),end(stockdata)+1));
  #};
  #plots = plot(tail(stockdataforecast,395),main = "30-days forecast")
  day30s <- tail(stockdataforecast,30)
  jsonFormat <- data.frame(time=time(day30s),values=day30s)
  jsonFormat <- toJSON(as.matrix(jsonFormat))
  return(jsonFormat)
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
