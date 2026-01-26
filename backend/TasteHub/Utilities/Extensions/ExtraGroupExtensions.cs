using TasteHub.DTOs.ExtraGroup;
using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class ExtraGroupExtensions
    {

        public static ExtraGroupDTO ToDTO(this ExtrasGroup extrasGroup)
        {
            if (extrasGroup == null)
            {
                return null;
            }

            return new ExtraGroupDTO
            {
                Id = extrasGroup.Id,
                NameEn = extrasGroup.NameEn,
                NameAr = extrasGroup.NameAr,
                Required = extrasGroup.Required,
                MaxSelect = extrasGroup.MaxSelect
            };
        }

        public static ExtrasGroup ToEntity(this ExtraGroupDTO extraGroupDTO)
        {
            if (extraGroupDTO == null)
            {
                return null;
            }

            return new ExtrasGroup
            {
                Id = extraGroupDTO.Id ?? default,
                NameEn = extraGroupDTO.NameEn,
                NameAr = extraGroupDTO.NameAr,
                Required = extraGroupDTO.Required,
                MaxSelect = extraGroupDTO.MaxSelect
            };
        }

        public static void UpdateFromDTO(this ExtrasGroup extrasGroup, ExtraGroupDTO extraGroupDTO)
        {

            if (extrasGroup == null || extraGroupDTO == null)
            {
                return;
            }

            extrasGroup.NameEn = extraGroupDTO.NameEn;
            extrasGroup.NameAr = extraGroupDTO.NameAr;
            extrasGroup.Required = extraGroupDTO.Required;
            extrasGroup.MaxSelect = extraGroupDTO.MaxSelect;

            extrasGroup.UpdatedAt = DateTime.UtcNow;
        }

    }
}
