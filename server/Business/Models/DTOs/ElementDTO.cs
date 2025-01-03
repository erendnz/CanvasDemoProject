using Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.DTOs
{
    public class ElementDTO
    {
        public int ElementId { get; set; }
        public int CanvasId { get; set; }
        public ElementType ElementType { get; set; }
        public OperatorType? OperatorType { get; set; }
        public InputType? InputType { get; set; }
        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
        public float Rotation { get; set; }
        public float? StartValue { get; set; }
        public float? EndValue { get; set; }
        public float? StartTime { get; set; }
        public float? EndTime { get; set; }
        public float? Value { get; set; }
        public float? StepTime { get; set; }
    }
}
