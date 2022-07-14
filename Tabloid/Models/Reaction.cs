using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Reaction
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public int UserProfileId { get; set; }
    }
}
