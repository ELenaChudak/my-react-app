class CryptocompareResponseAdapter {

    adapt(response) {
        const data = this.getRequiredDataFromResponse(response);
        const labels = this.getLabelsCollection(data);
        const datasets = this.getDatasetsCollection(data);

        return { labels, datasets };
    }

    getRequiredDataFromResponse(response) {
        return response.Data.map(coin => ({ 
            time: coin.time, 
            close: coin.close, 
            high: coin.high,
            low: coin.low, 
            open: coin.open
          }));
    }
    
    getLabelsCollection(data) {
        return data.map((item) => {
            const time = new Date(item.time * 1000);

            return time.toLocaleString();
        });
    }

    getDatasetsCollection(data) {
        return [
            {
                data: data.map((item) => (item.low * 1000000).toFixed(2)),
                backgroundColor: 'rgba(26, 188, 138, 0.2)',
                borderColor: 'rgba(26, 188, 138, 1)',
                borderWidth: 5
            }
        ];
    }

}

export { CryptocompareResponseAdapter }
