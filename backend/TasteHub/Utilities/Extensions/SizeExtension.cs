using TasteHub.DTOs.Extra;
using TasteHub.DTOs.Size;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class SizeExtension
    {
        public static SizeDTO ToDTO(this Size size)
        {
            if (size == null)
            {
                return null;
            }

            return new SizeDTO
            {
                Id = size.Id,
                NameEn = size.NameEn,
                NameAr = size.NameAr,
                PriceModifier = size.PriceModifier,
                CreatedAt = size.CreatedAt,
                UpdatedAt = size.UpdatedAt,
            };
        }

        public static Size ToEntity(this SizeDTO sizeDTO)
        {
            if (sizeDTO == null)
            {
                return null;
            }

            return new Size
            {
                Id = sizeDTO.Id ?? default,
                NameEn = sizeDTO.NameEn,
                NameAr = sizeDTO.NameAr,
                PriceModifier = sizeDTO.PriceModifier,
            };
        }

        public static void UpdateFromDTO(this Size size, SizeDTO sizeDTO)
        {

            if (size == null || sizeDTO == null)
            {
                return;
            }

            size.NameEn = sizeDTO.NameEn;
            size.NameAr = sizeDTO.NameAr;
            size.PriceModifier = sizeDTO.PriceModifier;

            size.UpdatedAt = DateTime.UtcNow;
        }
   
    }
}
