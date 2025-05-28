using Application.Interfaces.Blog;
using Core.Entities;
using Infrastructure.Common;
using Infrastructure.Models.Goldiran;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Application.Services.Catalog
{
    public class GoldiranService : IGoldiranService
    {
        private readonly Configs _configs;
        private readonly ILogger logger;

        public GoldiranService(IOptions<Configs> options, ILogger<GoldiranService> logger)
        {
            _configs = options.Value;
            this.logger = logger;
        }

        private HttpClient GenerateHttpClient()
        {
            var httpClient = new HttpClient();
            httpClient.BaseAddress =new Uri($"{_configs.GoldiranAPI}/");

            httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _configs.GoldiranAPIToken);

            return httpClient;
        }

        public async Task<GoldiranActionResult<List<KeyValueDto>>> GetBasicData(int datatype, int parentId)
        {
            logger.LogInformation($"call GetBasicData with dataType:{datatype}, parentId:{parentId}");
            var result = new GoldiranActionResult<List<KeyValueDto>>();
            using (var httpClient = GenerateHttpClient())
            {
                using (var response = await httpClient.GetAsync($"getBasicData?dataType={datatype}&parentId={parentId}"))
                {
                    var apiResponse = await response.Content.ReadFromJsonAsync<GoldiranActionResult<List<KeyValueDto>>>();
                    foreach (var kv in apiResponse.Data)
                    {
                        kv.Value = kv.Id;
                        kv.Label = kv.Title;
                        kv.Title = kv.Title;
                        kv.Text = kv.Title;

                    }
                    logger.LogInformation($"call GetBasicData Result:{apiResponse}");
                    return apiResponse;
                }
            }
        }

        public async Task<GoldiranActionResult<List<ParishItemDto>>> GetParishList(int cityId, int regionId, string term)
        {
            var result = new GoldiranActionResult<List<ParishItemDto>>();
            using (var httpClient = GenerateHttpClient())
            {
                using (var response = await httpClient.GetAsync($"getParishList?cityId={cityId}&regionId={regionId}&term={term}"))
                {
                    var apiResponse = await response.Content.ReadFromJsonAsync<GoldiranActionResult<List<ParishItemDto>>>();
                    foreach (var kv in apiResponse.Data)
                    {
                        kv.Value = kv.Id;
                        kv.Label = kv.ParishName;
                        kv.Text = kv.ParishName;
                        kv.Title = kv.ParishName;

                    }
                    return apiResponse;
                }
            }
        }

        public async Task<GoldiranActionResult<PartBalanceInfoDto>> GetPartBalanceInfo(string partNo)
        {
            var result = new GoldiranActionResult<PartBalanceInfoDto>();
            using (var httpClient = GenerateHttpClient())
            {
                using (var response = await httpClient.GetAsync($"getPartBalanceInfo?partNo={partNo}"))
                {
                    var apiResponse = await response.Content.ReadFromJsonAsync<GoldiranActionResult<PartBalanceInfoDto>>();
                    return apiResponse;
                }
            }
        }

        public async Task<GoldiranActionResult<string>> RegisterOnlineSale(RegisterOnlineSaleDto data)
        {
            var result = new GoldiranActionResult<string>();
            var jsonData = JsonSerializer.Serialize(data);
            var requestContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

            using (var httpClient = GenerateHttpClient())
            {
                using (var response = await httpClient.PostAsync("registerOnlineSale", requestContent))
                {
                    var apiResponse = await response.Content.ReadFromJsonAsync<GoldiranActionResult<string>>();
                    response.EnsureSuccessStatusCode();
                    return apiResponse;
                }
            }
        }
    }
}
