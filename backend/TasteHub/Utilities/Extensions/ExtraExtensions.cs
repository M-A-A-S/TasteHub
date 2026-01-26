using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class ExtraExtensions
    {

        public static ExtraDTO ToDTO(this Extra extra)
        {
            if (extra == null)
            {
                return null;
            }

            return new ExtraDTO
            {
                Id = extra.Id,
                GroupId = extra.GroupId,
                NameEn = extra.NameEn,
                NameAr = extra.NameAr,
                Price = extra.Price
            };
        }

        public static Extra ToEntity(this ExtraDTO extraDTO)
        {
            if (extraDTO == null)
            {
                return null;
            }

            return new Extra
            {
                Id = extraDTO.Id ?? default,
                GroupId = extraDTO.GroupId,
                NameEn = extraDTO.NameEn,
                NameAr = extraDTO.NameAr,
                Price = extraDTO.Price,
            };
        }

        public static void UpdateFromDTO(this Extra extra, ExtraDTO extraDTO)
        {

            if (extra == null || extraDTO == null)
            {
                return;
            }

            extra.GroupId = extraDTO.GroupId;
            extra.NameEn = extraDTO.NameEn;
            extra.NameAr = extraDTO.NameAr;
            extra.Price = extraDTO.Price;

            extra.UpdatedAt = DateTime.UtcNow;
        }

    }
}
