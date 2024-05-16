import { TimeService } from '../time-service.service';

export function getRemainingTime(
  tournamentDate: Date,
  timeService: TimeService,
  currentDate: Date
): string {
  const tournamentDateIso = new Date(tournamentDate);

  if (
    !(tournamentDateIso instanceof Date) ||
    isNaN(tournamentDateIso.getTime())
  ) {
    return 'Date invalide';
  }

  const timeDifference = tournamentDateIso.getTime() - currentDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (daysDifference > 0 || hoursDifference > 0 || minutesDifference > 0) {
    let remainingTimeMessage = 'Inscription disponible pendant :';

    if (daysDifference > 0) {
      remainingTimeMessage += ` ${daysDifference} jour${
        daysDifference > 1 ? 's' : ''
      }`;
    }

    if (hoursDifference > 0) {
      remainingTimeMessage += ` ${hoursDifference} heure${
        hoursDifference > 1 ? 's' : ''
      }`;
    }

    if (minutesDifference > 0) {
      remainingTimeMessage += ` ${minutesDifference} minute${
        minutesDifference > 1 ? 's' : ''
      }`;
    }

    return remainingTimeMessage;
  } else {
    timeService.setLimitInscription(0);
    return 'Inscription terminée';
  }
}
