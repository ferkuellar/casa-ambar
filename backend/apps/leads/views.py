from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LeadCreateSerializer
from .services import send_lead_notification


class LeadCreateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LeadCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = serializer.save()

        try:
            send_lead_notification(lead)
        except Exception:
            # Lead capture must not fail because internal notification is unavailable.
            pass

        return Response(
            {
                "id": lead.id,
                "status": "received",
                "message": "Gracias. Hemos recibido tu solicitud.",
            },
            status=status.HTTP_201_CREATED,
        )
