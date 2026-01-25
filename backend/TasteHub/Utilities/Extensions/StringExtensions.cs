namespace TasteHub.Utilities.Extensions
{
    public static class StringExtensions
    {
        //public static bool IsValidImageUrl(this string url)
        //{
        //    return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
        //        && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps)
        //        && (url.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
        //            || url.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
        //            || url.EndsWith(".png", StringComparison.OrdinalIgnoreCase)
        //            || url.EndsWith(".gif", StringComparison.OrdinalIgnoreCase)
        //            || url.EndsWith(".webp", StringComparison.OrdinalIgnoreCase));
        //}


        public static bool IsValidImageUrl(this string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp
                    || uriResult.Scheme == Uri.UriSchemeHttps);
        }

    }
}
