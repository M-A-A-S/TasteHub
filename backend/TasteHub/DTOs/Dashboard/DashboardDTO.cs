namespace TasteHub.DTOs.Dashboard
{
    public class DashboardDTO
    {

        public IEnumerable<StatDTO> Stats { get; set; }
        public IEnumerable<TopItemDTO> TopItems { get; set; }
        public IEnumerable<SalesDTO> Sales { get; set; }

    }
}
