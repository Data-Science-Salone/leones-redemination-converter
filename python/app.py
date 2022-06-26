from flask import Flask
from flask_restful import Resource, Api
from bs4 import BeautifulSoup
import urllib.request

app = Flask(__name__)
api = Api(app)
class curency_converter2(Resource):
    def get(self):
        #this function using  BeautifulSoup, urllib.request and  csv liberies
        # specify the url
        urlpage =  'http://www.bsl.gov.sl/'
        # query the website and return the html to the variable 'page'
        page = urllib.request.urlopen(urlpage)
        # parse the html using beautiful soup and store in variable 'soup'
        soup = BeautifulSoup(page, 'html.parser')

        #usd buying at
        usd_soup_buy = soup.find('div', attrs={'id': 'wb_Text99'})
        usd_buy_result_spn = usd_soup_buy.find('span')
        usd_buy_result = usd_buy_result_spn.find('strong')
        usd_buy_rate = usd_buy_result.getText()
        usd_buy_split = usd_buy_rate.split(': ')
        usd_buy = usd_buy_split[1]

        #usd selling at
        usd_soup_sell = soup.find('div', attrs={'id': 'wb_Text100'})
        usd_sell_result_spn = usd_soup_sell.find('span')
        usd_sell_result = usd_sell_result_spn.find('strong')
        usd_sell_rate = usd_sell_result.getText()
        usd_sell_split = usd_sell_rate.split(': ')
        usd_sell = usd_sell_split[1]

        #gbp buying at
        gbp_soup_buy = soup.find('div', attrs={'id': 'wb_Text66'})
        gbp_buy_result_spn = gbp_soup_buy.find('span')
        gbp_buy_result = gbp_buy_result_spn.find('strong')
        gbp_buy_rate = gbp_buy_result.getText()
        gbp_buy_split = gbp_buy_rate.split(': ')
        gbp_buy_sp = gbp_buy_split[0].split(' ')
        gbp_buy = gbp_buy_sp[1]

        #gbp selling at
        gbp_soup_sell = soup.find('div', attrs={'id': 'wb_Text67'})
        gbp_sell_result_spn = gbp_soup_sell.find('span')
        gbp_sell_result = gbp_sell_result_spn.find('strong')
        gbp_sell_rate = gbp_sell_result.getText()
        gbp_sell_split = gbp_sell_rate.split(': ')
        gbp_sell_sp = gbp_sell_split[0].split(' ')
        gbp_sell = gbp_sell_sp[1]

        #euro buying at
        euro_soup_buy = soup.find('div', attrs={'id': 'wb_Text96'})
        euro_buy_result_spn = euro_soup_buy.find('span')
        euro_buy_result = euro_buy_result_spn.find('strong')
        euro_buy_rate = euro_buy_result.getText()
        euro_buy_split = euro_buy_rate.split(': ')
        euro_buy = euro_buy_split[1]

        #gbp selling at
        euro_soup_sell = soup.find('div', attrs={'id': 'wb_Text98'})
        euro_sell_result_spn = euro_soup_sell.find('span')
        euro_sell_result = euro_sell_result_spn.find('strong')
        euro_sell_rate = euro_sell_result.getText()
        euro_sell_split = euro_sell_rate.split(': ')
        euro_sell = euro_sell_split[1]
        forex = {"usd": {"selling":usd_sell,"buying":usd_buy},"gbp":{"selling":gbp_sell,"buying":gbp_buy},"euro":{"selling":euro_sell,"buying":euro_buy}}
        return forex

class curency_converter(Resource):
    def post(self):
        #this function using  BeautifulSoup, urllib.request and  csv liberies
        # specify the url
        urlpage =  'http://www.bsl.gov.sl/'
        # query the website and return the html to the variable 'page'
        page = urllib.request.urlopen(urlpage)
        # parse the html using beautiful soup and store in variable 'soup'
        soup = BeautifulSoup(page, 'html.parser')

        #usd buying at
        usd_soup_buy = soup.find('div', attrs={'id': 'wb_Text99'})
        usd_buy_result_spn = usd_soup_buy.find('span')
        usd_buy_result = usd_buy_result_spn.find('strong')
        usd_buy_rate = usd_buy_result.getText()
        usd_buy_split = usd_buy_rate.split(': ')
        usd_buy = usd_buy_split[1]

        #usd selling at
        usd_soup_sell = soup.find('div', attrs={'id': 'wb_Text100'})
        usd_sell_result_spn = usd_soup_sell.find('span')
        usd_sell_result = usd_sell_result_spn.find('strong')
        usd_sell_rate = usd_sell_result.getText()
        usd_sell_split = usd_sell_rate.split(': ')
        usd_sell = usd_sell_split[1]

        #gbp buying at
        gbp_soup_buy = soup.find('div', attrs={'id': 'wb_Text66'})
        gbp_buy_result_spn = gbp_soup_buy.find('span')
        gbp_buy_result = gbp_buy_result_spn.find('strong')
        gbp_buy_rate = gbp_buy_result.getText()
        gbp_buy_split = gbp_buy_rate.split(': ')
        gbp_buy_sp = gbp_buy_split[0].split(' ')
        gbp_buy = gbp_buy_sp[1]

        #gbp selling at
        gbp_soup_sell = soup.find('div', attrs={'id': 'wb_Text67'})
        gbp_sell_result_spn = gbp_soup_sell.find('span')
        gbp_sell_result = gbp_sell_result_spn.find('strong')
        gbp_sell_rate = gbp_sell_result.getText()
        gbp_sell_split = gbp_sell_rate.split(': ')
        gbp_sell_sp = gbp_sell_split[0].split(' ')
        gbp_sell = gbp_sell_sp[1]

        #euro buying at
        euro_soup_buy = soup.find('div', attrs={'id': 'wb_Text96'})
        euro_buy_result_spn = euro_soup_buy.find('span')
        euro_buy_result = euro_buy_result_spn.find('strong')
        euro_buy_rate = euro_buy_result.getText()
        euro_buy_split = euro_buy_rate.split(': ')
        euro_buy = euro_buy_split[1]

        #gbp selling at
        euro_soup_sell = soup.find('div', attrs={'id': 'wb_Text98'})
        euro_sell_result_spn = euro_soup_sell.find('span')
        euro_sell_result = euro_sell_result_spn.find('strong')
        euro_sell_rate = euro_sell_result.getText()
        euro_sell_split = euro_sell_rate.split(': ')
        euro_sell = euro_sell_split[1]
        forex = {"usd": {"selling":usd_sell,"buying":usd_buy},"gbp":{"selling":gbp_sell,"buying":gbp_buy},"euro":{"selling":euro_sell,"buying":euro_buy}}
        return forex
        
api.add_resource(curency_converter, '/')
api.add_resource(curency_converter2, '/')




if __name__ == '__main__':
    app.run(debug=True, port=9009)