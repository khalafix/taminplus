using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Catalog
{
    public interface IProductService
    {
        #region Admin - Product
        Task<GoldiranActionResult<List<UserLogSearchForProductDto>>> GetListUserLogSearchForProduct(GridQueryModel model = null);
        Task<GoldiranActionResult<List<ProductDto>>> GetList(GridQueryModel model = null);
        Task<byte[]> GetListForExcel(GridQueryModel model = null, string fileName = null);
        Task<GoldiranActionResult<int>> ImportPriceListWithExcel(IFormFile file, Guid userId);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetListWithCategory(int categoryId);
        Task<GoldiranActionResult<int>> Add(ProductDto model);
        Task<GoldiranActionResult<int>> Update(ProductDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<ProductDto>> GetById(int id);
        Task<byte[]> GetListUserLogSearchForExcel(GridQueryModel model = null, string fileName = null);
        #endregion

        #region  Product - Attachment
        Task<GoldiranActionResult<bool>> DeleteAttachment(Guid attachmentId);
        Task<GoldiranActionResult<ProductAttachmentDto>> GetProductAttachment(int id);
        Task<GoldiranActionResult<int>> UpdateProductAttachment(ProductAttachmentInputDto model);
        #endregion

        #region Article - Product
        Task<GoldiranActionResult<ArticleProductInputDto>> GetArticleProductById(int id);
        Task<GoldiranActionResult<int>> AddArticleProduct(ArticleProductInputDto model);
        #endregion


        #region Video - Product
        Task<GoldiranActionResult<VideoProductInputDto>> GetVideoProductById(int id);
        Task<GoldiranActionResult<int>> AddVideoProduct(VideoProductInputDto model);
        #endregion

        #region Similar - Product
        Task<GoldiranActionResult<SimilarProductInputDto>> GetSimilarProductById(int id);
        Task<GoldiranActionResult<int>> AddSimilarProduct(SimilarProductInputDto model);
        #endregion

        #region Delivery - Product
        Task<GoldiranActionResult<int>> UpdateDeliveryProduct(DeliveryProductDto model);
        Task<GoldiranActionResult<List<DeliveryProductDto>>> GetDeliveryProduct(DeliveryProductFilterDto model = null);
        Task<GoldiranActionResult<int>> AddDeliveryProduct(DeliveryProductDto model);
        Task<GoldiranActionResult<DeliveryProductDto>> GetDeliveryProductById(int id);
        Task<GoldiranActionResult<int>> DeleteDeliveryProduct(int id);
        #endregion


        #region Financial - Product
        Task<GoldiranActionResult<int>> UpdateFinancialProduct(FinancialProductDto model);
        Task<GoldiranActionResult<FinancialProductDto>> GetFinancialProductById(int id);
        Task<GoldiranActionResult<List<FinancialProductDto>>> GetFinancialProductList(int productId);
        #endregion


        #region User - Product
        Task<GoldiranActionResult<UserProductDetailsDto>> GetByTitle(string title);
        Task<GoldiranActionResult<List<UserProductDto>>> GetTopVisitedProductList(int count = 6);
        Task<GoldiranActionResult<List<UserProductDto>>> GetTopSaleProductList(int count = 6);
        Task<GoldiranActionResult<List<UserProductDto>>> GetTopNewProductList(int count = 6);
        Task<GoldiranActionResult<List<UserProductDto>>> GetSpecialOfferProductList(int count = 6);

        Task<GoldiranActionResult<UserSimilarProductDto>> GetUserSimilarProductByTitle(string title);

        Task<GoldiranActionResult<List<UserProductDto>>> GetUserList(GridQueryModel model = null);
        Task<GoldiranActionResult<List<string>>> GetAllTitle();

        Task<GoldiranActionResult<UserProductDetailsDto>> GetProductDetail(int id);
        Task<GoldiranActionResult<SimilarDto>> GetSimilarData(int id);
        Task<GoldiranActionResult<List<UserProductDto>>> GetProductsForParentItemsMegaMenu(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> GetSpecialOfferProductCount();
        Task<GoldiranActionResult<int>> AddFavoriteProduct(FavoriteProductModel model, Guid userId);

        Task<GoldiranActionResult<List<FavoriteProductDto>>> GetAllFavoriteProduct(Guid userId);
        Task<GoldiranActionResult<bool>> GetByIdFavoriteProduct(Guid userId, int productId);
        #endregion





    }
}
